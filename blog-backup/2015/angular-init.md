Angular 启动流程
========

`Angular`的一个结构其实是像下面这样的：

```js
(function(window, document, undefined) {
  
  var angular = window.angular || (window.angular = {});

  function bindJquery() {
  }
  
  function angularInit (element, bootstrap) {
  }

  if (window.angular.bootstrap) {
    //AngularJS is already loaded, so we can return here...
    console.log('WARNING: Tried to load angular more than once.');
    return;
  }

  //try to bind to jquery now so that one can write jqLite(document).ready()
  //but we will rebind on bootstrap again.
  bindJQuery();

  publishExternalAPI(angular);

  jqLite(document).ready(function() {
    angularInit(document, bootstrap);
  });

})(window, document);
```

上面其实是`Angular`的大致的组织结构，首先执行的是`bindJQuery()`，这个函数的作用是判断是否引入了`jQuery`，如果没有则使用内部的`JQLite`。

```js
// 是否绑定了jquery
var bindJQueryFired = false;
var skipDestroyOnNextJQueryCleanData;
function bindJQuery() {
  var originalCleanData;

  // 如果绑定了jquery，则直接返回
  if (bindJQueryFired) {
    return;
  }

  // bind to jQuery if present;
  jQuery = window.jQuery;
  // Use jQuery if it exists with proper functionality, otherwise default to us.
  // Angular 1.2+ requires jQuery 1.7+ for on()/off() support.
  // Angular 1.3+ technically requires at least jQuery 2.1+ but it may work with older
  // versions. It will not work for sure with jQuery <1.7, though.
  if (jQuery && jQuery.fn.on) {
    jqLite = jQuery;
    // 扩展jquery
    extend(jQuery.fn, {
      scope: JQLitePrototype.scope,
      isolateScope: JQLitePrototype.isolateScope,
      controller: JQLitePrototype.controller,
      injector: JQLitePrototype.injector,
      inheritedData: JQLitePrototype.inheritedData
    });

    // All nodes removed from the DOM via various jQuery APIs like .remove()
    // are passed through jQuery.cleanData. Monkey-patch this method to fire
    // the $destroy event on all removed nodes.
    originalCleanData = jQuery.cleanData;
    jQuery.cleanData = function(elems) {
      var events;
      if (!skipDestroyOnNextJQueryCleanData) {
        for (var i = 0, elem; (elem = elems[i]) != null; i++) {
          events = jQuery._data(elem, "events");
          if (events && events.$destroy) {
            jQuery(elem).triggerHandler('$destroy');
          }
        }
      } else {
        skipDestroyOnNextJQueryCleanData = false;
      }
      originalCleanData(elems);
    };
  } else {
    jqLite = JQLite;
  }

  // 可以看到，angular.element是通过jqLite或jquery来获取元素
  angular.element = jqLite;

  // Prevent double-proxying.
  bindJQueryFired = true;
}
```

说完了`bindJQuery()`，接下来执行的就是`publishExternalAPI(angular)`，这个函数在`src/AngularPublic.js`中，那么这行代码的作用是：

 - 将一些通用方法扩展到`angular`对象中，例如`forEach`等方法
 - 注册`ng`和`ngLocale`模块（`ng`模块依赖`ngLocale`）
 - 会向`ng`模块的`_configBlcoks`添加一个用于注册`Angular`内部`directive`、`services`的函数，会在`angularInit()`后执行

```js
function publishExternalAPI(angular) {
  extend(angular, {
    'bootstrap': bootstrap,
    'copy': copy,
    'extend': extend,
    'equals': equals,
    'element': jqLite,
    'forEach': forEach,
    'injector': createInjector,
    'noop': noop,
    'bind': bind,
    'toJson': toJson,
    'fromJson': fromJson,
    'identity': identity,
    'isUndefined': isUndefined,
    'isDefined': isDefined,
    'isString': isString,
    'isFunction': isFunction,
    'isObject': isObject,
    'isNumber': isNumber,
    'isElement': isElement,
    'isArray': isArray,
    'version': version,
    'isDate': isDate,
    'lowercase': lowercase,
    'uppercase': uppercase,
    'callbacks': {counter: 0},
    'getTestability': getTestability,
    '$$minErr': minErr,
    '$$csp': csp,
    'reloadWithDebugInfo': reloadWithDebugInfo
  });

  angularModule = setupModuleLoader(window);
  // 注册`ngLocale`
  try {
    angularModule('ngLocale');
  } catch (e) {
    angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
  }

  // 注册`ng`模块，依赖为`ngLocale`
  angularModule('ng', ['ngLocale'], ['$provide',
    function ngModule($provide) {
      // $$sanitizeUriProvider needs to be before $compileProvider as it is used by it.
      $provide.provider({
        $$sanitizeUri: $$SanitizeUriProvider
      });
      $provide.provider('$compile', $CompileProvider).
        directive({
            a: htmlAnchorDirective,
            input: inputDirective,
            textarea: inputDirective,
            form: formDirective,
            script: scriptDirective,
            select: selectDirective,
            style: styleDirective,
            option: optionDirective,
            ngBind: ngBindDirective,
            ngBindHtml: ngBindHtmlDirective,
            ngBindTemplate: ngBindTemplateDirective,
            ngClass: ngClassDirective,
            ngClassEven: ngClassEvenDirective,
            ngClassOdd: ngClassOddDirective,
            ngCloak: ngCloakDirective,
            ngController: ngControllerDirective,
            ngForm: ngFormDirective,
            ngHide: ngHideDirective,
            ngIf: ngIfDirective,
            ngInclude: ngIncludeDirective,
            ngInit: ngInitDirective,
            ngNonBindable: ngNonBindableDirective,
            ngPluralize: ngPluralizeDirective,
            ngRepeat: ngRepeatDirective,
            ngShow: ngShowDirective,
            ngStyle: ngStyleDirective,
            ngSwitch: ngSwitchDirective,
            ngSwitchWhen: ngSwitchWhenDirective,
            ngSwitchDefault: ngSwitchDefaultDirective,
            ngOptions: ngOptionsDirective,
            ngTransclude: ngTranscludeDirective,
            ngModel: ngModelDirective,
            ngList: ngListDirective,
            ngChange: ngChangeDirective,
            pattern: patternDirective,
            ngPattern: patternDirective,
            required: requiredDirective,
            ngRequired: requiredDirective,
            minlength: minlengthDirective,
            ngMinlength: minlengthDirective,
            maxlength: maxlengthDirective,
            ngMaxlength: maxlengthDirective,
            ngValue: ngValueDirective,
            ngModelOptions: ngModelOptionsDirective
        }).
        directive({
          ngInclude: ngIncludeFillContentDirective
        }).
        directive(ngAttributeAliasDirectives).
        directive(ngEventDirectives);
      $provide.provider({
        $anchorScroll: $AnchorScrollProvider,
        $animate: $AnimateProvider,
        $browser: $BrowserProvider,
        $cacheFactory: $CacheFactoryProvider,
        $controller: $ControllerProvider,
        $document: $DocumentProvider,
        $exceptionHandler: $ExceptionHandlerProvider,
        $filter: $FilterProvider,
        $interpolate: $InterpolateProvider,
        $interval: $IntervalProvider,
        $http: $HttpProvider,
        $httpBackend: $HttpBackendProvider,
        $location: $LocationProvider,
        $log: $LogProvider,
        $parse: $ParseProvider,
        $rootScope: $RootScopeProvider,
        $q: $QProvider,
        $$q: $$QProvider,
        $sce: $SceProvider,
        $sceDelegate: $SceDelegateProvider,
        $sniffer: $SnifferProvider,
        $templateCache: $TemplateCacheProvider,
        $templateRequest: $TemplateRequestProvider,
        $$testability: $$TestabilityProvider,
        $timeout: $TimeoutProvider,
        $window: $WindowProvider,
        $$rAF: $$RAFProvider,
        $$asyncCallback: $$AsyncCallbackProvider,
        $$jqLite: $$jqLiteProvider
      });
    }
  ]);
}
```

最后会在`document ready`后执行`angularInit(document, bootstrap)`，这个就是`angular`启动的核心部分了，下面来一一分析：

```js
function angularInit(element, bootstrap) {
  var appElement,
      module,
      config = {};

  // The element `element` has priority over any other element
  // 这个就是找到我们设置了`ng-app`特性的元素，一般我们会`<html ng-app="myApp">`这样写
  // 当然也可以是其他前缀了
  // var ngAttrPrefixes = ['ng-', 'data-ng-', 'ng:', 'x-ng-'];
  forEach(ngAttrPrefixes, function(prefix) {
    var name = prefix + 'app';

    if (!appElement && element.hasAttribute && element.hasAttribute(name)) {
      // 模块元素
      appElement = element;
      // 模块名称
      module = element.getAttribute(name);
    }
  });
  forEach(ngAttrPrefixes, function(prefix) {
    var name = prefix + 'app';
    var candidate;

    if (!appElement && (candidate = element.querySelector('[' + name.replace(':', '\\:') + ']'))) {
      appElement = candidate;
      module = candidate.getAttribute(name);
    }
  });
  if (appElement) {
    // 是否是严格模式的依赖注入
    config.strictDi = getNgAttribute(appElement, "strict-di") !== null;
    // 调用bootstrap函数，这个bootstrap也会扩展到`angular`中
    // 我们也可以通过`angular.bootstrap(element, [module])`手动来启动
    bootstrap(appElement, module ? [module] : [], config);
  }
}
```

看完了`angularInit()`，我们再来看看`bootstrap()`的内部原理：

```js
function bootstrap(element, modules, config) {
  if (!isObject(config)) config = {};
  // 默认严格依赖注入为false
  var defaultConfig = {
    strictDi: false
  };
  config = extend(defaultConfig, config);
  // 启动函数
  var doBootstrap = function() {
    // 获取元素节点
    element = jqLite(element);

    // 判断element的data中是否有`$injector`，如果有则说明已经启动了
    if (element.injector()) {
      var tag = (element[0] === document) ? 'document' : startingTag(element);
      //Encode angle brackets to prevent input from being sanitized to empty string #8683
      throw ngMinErr(
          'btstrpd',
          "App Already Bootstrapped with this Element '{0}'",
          tag.replace(/</,'&lt;').replace(/>/,'&gt;'));
    }

    modules = modules || [];
    // 添加匿名模块
    modules.unshift(['$provide', function($provide) {
      $provide.value('$rootElement', element);
    }]);

    // 判断是否配置了显示debug信息
    if (config.debugInfoEnabled) {
      // Pushing so that this overrides `debugInfoEnabled` setting defined in user's `modules`.
      modules.push(['$compileProvider', function($compileProvider) {
        $compileProvider.debugInfoEnabled(true);
      }]);
    }

    // 添加ng模块
    modules.unshift('ng');
    // modules = ['ng', ['$provide', function($provide) {
    //   $provide.value('$rootElement', element);
    // }], 'myApp']
    // 创建injector对象，此时modules数组有三个元素
    var injector = createInjector(modules, config.strictDi);
    injector.invoke(['$rootScope', '$rootElement', '$compile', '$injector',
       function bootstrapApply(scope, element, compile, injector) {
        scope.$apply(function() {
          element.data('$injector', injector);
          compile(element)(scope);
        });
      }]
    );
    return injector;
  };

  var NG_ENABLE_DEBUG_INFO = /^NG_ENABLE_DEBUG_INFO!/;
  var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;

  if (window && NG_ENABLE_DEBUG_INFO.test(window.name)) {
    config.debugInfoEnabled = true;
    window.name = window.name.replace(NG_ENABLE_DEBUG_INFO, '');
  }

  // 调用doBootstrap()启动
  if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
    return doBootstrap();
  }

  window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
  angular.resumeBootstrap = function(extraModules) {
    forEach(extraModules, function(module) {
      modules.push(module);
    });
    doBootstrap();
  };
}
```

这里的`doBootstrap()`内部又调用到了`createInjector()`函数，这个函数再`src/ng/injector.js`中，