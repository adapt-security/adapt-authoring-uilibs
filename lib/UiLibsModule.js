import { AbstractModule } from 'adapt-authoring-core';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
/**
 * The main entry-point for the Adapt authoring tool web-app/front-end
 * @extends {AbstractModule}
 */
class UiLibsModule extends AbstractModule {
  /** @override */
  async init() {
    const ui = await this.app.waitForModule('ui');
    ui.preBuildHook.tap(this.onPreBuild.bind(this));
    ui.postBuildHook.tap(this.onPostBuild.bind(this));
    
    this.libraries = (await import(new URL('../lib/LIBRARIES.js', import.meta.url))).default;
    this.libsDir;
  }
  async iteratePaths(iteratorFunc) {
    return Promise.all(Object.entries(this.libraries).map(async ([name, data]) => {
      return Promise.all(data.paths.map(p => iteratorFunc(name, data, p)));
    }));
  }
  async writeLibraries(buildData) {
    const config = { 
      paths: {}, 
      shim: {} 
    };
    await mkdir(this.libsDir, { recursive: true });

    this.iteratePaths(async (name, data, p) => {
      const isUrl = p.startsWith('http');
      const filename = path.basename(p);
      if(data.paths) config.paths[name] = path.join(this.libsDir, filename.replace(path.extname(filename), ''));
      if(data.shim) config.shim[name] = data.shim;
      await writeFile(path.resolve(this.libsDir, filename), await (isUrl ? this.fetch(p) : this.readFile(p)));
    });

    Object.entries(config).forEach(([key, values]) => Object.assign(buildData.requireJsConfig[key], values));
  }
  async fetch(fileUrl) {
    const response = await fetch(fileUrl);
    if(response.status !== 200) {
      const e = new Error(response.statusText);
      e.statusCode = response.status;
      throw e;
    }
    return response.body;
  }
  async readFile(filePath) {
    const fileUrl = new URL(`../${filePath}`, import.meta.url);
    return readFile(fileUrl);
  }
  async onPreBuild(buildData) {
    try {
      this.libsDir = path.join(buildData.outputJsDir, 'libraries');
      await this.writeLibraries(buildData);
    } catch(e) {
      this.log('error', e);
    }
  }
  async onPostBuild(buildData) {
    try {
      if(this.app.getConfig('isProduction')) {
        await this.iteratePaths((name, data, p) => !data.production && fs.rm(path.join(this.libsDir, path.basename(p))));
        return;
      }
      let requireJsConfig = (await fs.readFile(buildData.requireJsConfigPath)).toString() + '';
      // convert absolute paths to relative
      const pathsStr = Object.entries(buildData.requireJsConfig.paths).reduce((s, [name, filepath]) => {
        return `${s}    "${name}": "${filepath.replace(buildData.buildDir, '').replaceAll(path.sep, '/')}",\n`;
      }, '');

      requireJsConfig = requireJsConfig
        .replace(/"paths": {[\s\S]+?}/, `"paths": {\n${pathsStr}  }`)
        .replace(/"baseUrl": ".+"/, `"baseUrl": "/"`);

      await fs,writeFile(buildData.requireJsConfigPath, requireJsConfig);

    } catch(e) {
      this.log('error', e);
    }
  }
}

export default UiLibsModule;