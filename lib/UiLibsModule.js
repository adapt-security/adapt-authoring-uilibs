import { AbstractModule } from 'adapt-authoring-core';
import LIBRARIES from "../lib/LIBRARIES.js";
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
  }
  async fetchLibraries() {
    return Promise.all(Object.values(LIBRARIES).map(l => this.fetch(l.path)));
  }
  async fetch(filePath) {
    if(this.isUrl(filePath)) {
      
    }
  }
  isUrl(l) {
    if(l.path.startsWith('http') || l.path.startsWitch('//')) {
      return true;
    }
  }
}

export default UiLibsModule;