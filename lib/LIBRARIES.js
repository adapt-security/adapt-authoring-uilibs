export default {
  aceEditor: {
    version: '1.9.5',
    paths: ['https://cdnjs.cloudflare.com/ajax/libs/ace/1.9.5/ace.js']
  },
  babelPolyfill: {
    version: '',
    paths: ['libraries/babel-polyfill.min.js']
  },
  backbone: {
    version: '1.1.0',
    paths: ['libraries/backbone.js'],
    shim: {
      deps: ['underscore','jquery'],
      exports: 'Backbone'
    }
  },
  backboneForms: {
    version: '0.14.0',
    paths: ['libraries/backbone-forms.js'],
    shim: {
      deps: ['backbone']
    }
  },
  backboneFormsLists: {
    version: '',
    paths: ['libraries/backbone-forms-lists.js'],
    shim: {
      deps: ['backboneForms']
    }
  },
  ckEditor: {
    version: '4.5.7',
    paths: ['https://cdn.ckeditor.com/4.5.7/full-all/ckeditor.js']
  },
  handlebars: {
    version: '4.4.0',
    paths: ['libraries/handlebars.js'],
    shim: {
      exports: 'Handlebars'
    }
  },
  imageReady: {
    version: '',
    paths: ['libraries/imageReady.js'],
    shim: {
      deps: ['jquery'],
      exports: 'imageready'
    }
  },
  inview: {
    version: '',
    paths: ['libraries/inview.js'],
    shim: {
      deps: ['jquery'],
      exports: 'inview'
    }
  },
  jquery: {
    version: '1.11.2',
    paths: ['libraries/jquery.js']
  },
  jqueryForm: {
    version: '3.50.0-2014.02.05',
    paths: ['libraries/jquery.form.js'],
    shim: {
      deps: ['jquery'],
      exports: "$"
    }
  },
  jqueryTagsInput: {
    version: '',
    paths: ['libraries/jquery.tagsinput.min.js'],
    shim: {
      deps: ['jquery'],
      exports: "$"
    }
  },
  jqueryUi: {
    version: '1.11.2',
    paths: ['libraries/jquery-ui.min.js'],
    shim: {
      deps: ['jquery'],
      exports: "$"
    }
  },
  moment: {
    version: '2.11.1',
    paths: ['libraries/moment.min.js'],
    shim: {
      exports: 'moment'
    }
  },
  polyglot: {
    version: '',
    paths: ['libraries/polyglot.min.js'],
    shim: {
      exports: 'Polyglot'
    }
  },
  require: {
    version: '2.1.9',
    paths: ['libraries/require.js'],
    production: true
  },
  scrollTo: {
    version: '1.4.3.1',
    paths: ['libraries/scrollTo.js'],
    shim: {
      deps: ['jquery'],
      exports: 'scrollTo'
    }
  },
  selectize: {
    version: '',
    paths: [
      'libraries/selectize/css/selectize.less',
      'libraries/selectize/js/selectize.js'
    ],
    shim: {
      deps: ['jquery'],
      exports: "$"
    }
  },
  spectrum: {
    version: '1.8.0',
    paths: [
      'libraries/spectrum/spectrum.less',
      'libraries/spectrum/spectrum.js'
    ]
  },
  underscore: {
    version: '1.9.1',
    paths: ['libraries/underscore.js'],
    shim: {
      exports: '_'
    }
  },
  velocity: {
    version: '1.0.1',
    paths: ['libraries/velocity.js'],
    shim: {
      deps: ['jquery'],
      exports: 'velocity'
    }
  }
};