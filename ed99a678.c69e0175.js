(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{85:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return c})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return d}));var a=t(2),i=t(6),r=(t(0),t(91)),o={id:"customizing-docker-build",title:"Customizing the Docker Build",sidebar_label:"Customizing the Docker Build",slug:"/customizing-docker-build"},c={unversionedId:"customizing-docker-build",id:"customizing-docker-build",isDocsHomePage:!1,title:"Customizing the Docker Build",description:"We've already seen the standard way to configure Kuby's Docker component (i.e. the docker do ... end section), but there's a lot more you can do.",source:"@site/docs/customizing_docker_build.md",slug:"/customizing-docker-build",permalink:"/docs/customizing-docker-build",editUrl:"https://github.com/getkuby/kuby-core/edit/master/docs/docs/customizing_docker_build.md",version:"current",sidebar_label:"Customizing the Docker Build",sidebar:"sidebar",previous:{title:"Developing with Kuby [WIP]",permalink:"/docs/development"},next:{title:"Customizing Kubernetes Resources",permalink:"/docs/customizing-kubernetes-resources"}},l=[{value:"Installing Additional Packages",id:"installing-additional-packages",children:[]},{value:"Custom Build Phases",id:"custom-build-phases",children:[]}],s={rightToc:l};function d(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},s,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"We've already seen the standard way to configure Kuby's Docker component (i.e. the ",Object(r.b)("inlineCode",{parentName:"p"},"docker do ... end")," section), but there's a lot more you can do."),Object(r.b)("h2",{id:"installing-additional-packages"},"Installing Additional Packages"),Object(r.b)("p",null,"Kuby officially supports the Debian and Alpine distros of Linux for Docker images."),Object(r.b)("p",null,"Let's install imagemagick as an example. First, we'll need to register the imagemagick package with Kuby. It just so happens both the Debian and Alpine Linux distros use the same name for their imagemagick package, meaning we can define using just its name."),Object(r.b)("p",null,"Next, we tell Kuby to install imagemagick in the ",Object(r.b)("inlineCode",{parentName:"p"},"docker")," section of our Kuby config:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ruby"}),"Kuby.register_package('imagemagick')\n\nKuby.define('my-app') do\n  environment(:production) do\n    docker do\n      package_phase.add('imagemagick')\n    end\n  end\nend\n")),Object(r.b)("p",null,"If the package we want to install has a different name under each of the Linux distros, register it using a hash instead. Let's say we want to install the ",Object(r.b)("inlineCode",{parentName:"p"},"dig")," command-line utility. In Debian, we'd need to install the ",Object(r.b)("inlineCode",{parentName:"p"},"dnsutils")," package, but in Alpine we'd need ",Object(r.b)("inlineCode",{parentName:"p"},"bind-tools"),"."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ruby"}),"Kuby.register_package('dig', debian: 'dnsutils', alpine: 'bind-tools')\n\nKuby.define('my-app') do\n  environment(:production) do\n    docker do\n      package_phase.add('dig')\n    end\n  end\nend\n")),Object(r.b)("p",null,"Finally, some packages are more complicated to install. In such cases, define a Ruby class that responds to ",Object(r.b)("inlineCode",{parentName:"p"},"install_on_debian")," and ",Object(r.b)("inlineCode",{parentName:"p"},"install_on_alpine"),", and register it with Kuby."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ruby"}),"class WatchmanPackage < Kuby::Docker::Packages::Package\n  def install_on_debian(dockerfile)\n    dockerfile.run(<<~END)\n      git clone --no-checkout https://github.com/facebook/watchman.git \\\n        && cd watchman \\\n        && git checkout v4.7.0 \\\n        && ./autogen.sh \\\n        && ./configure \\\n        && make && make install\n    END\n  end\n\n  def install_on_alpine(dockerfile)\n    # alpine-specific statements\n  end\nend\n\nKuby.register_package('watchman', WatchmanPackage)\n\nKuby.define('my-app') do\n  environment(:production) do\n    docker do\n      package_phase.add('watchman')\n    end\n  end\nend\n")),Object(r.b)("h2",{id:"custom-build-phases"},"Custom Build Phases"),Object(r.b)("p",null,"Kuby builds Docker images in 7 build phases:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Setup phase"),": Defines the Docker base image (eg. ruby:2.6.3, ruby:2.6.3-alpine, etc), sets the working directory, and defines the ",Object(r.b)("inlineCode",{parentName:"li"},"KUBY_ENV")," and ",Object(r.b)("inlineCode",{parentName:"li"},"RAILS_ENV")," environment variables."),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Package phase"),": Installs packages via the operating system's package manager, eg. ",Object(r.b)("inlineCode",{parentName:"li"},"apt-get"),", ",Object(r.b)("inlineCode",{parentName:"li"},"apk"),", ",Object(r.b)("inlineCode",{parentName:"li"},"yum"),", etc. Popular packages include things like database drivers (eg. libmysqldev, sqlite3-dev), and image processing libraries (eg. imagemagick, graphicsmagick)."),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Bundler phase"),": Runs ",Object(r.b)("inlineCode",{parentName:"li"},"bundle install"),", which installs all the Ruby dependencies listed in your app's Gemfile."),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Yarn phase"),": Runs ",Object(r.b)("inlineCode",{parentName:"li"},"yarn install"),", which installs all the JavaScript dependencies listed in your app's package.json."),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Copy phase"),": Copies your app's source code into the image."),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Assets phase"),": Compiles assets managed by both the asset pipeline and webpacker."),Object(r.b)("li",{parentName:"ol"},Object(r.b)("strong",{parentName:"li"},"Webserver phase"),": Instructs the Docker image to use a webserver to run your app. Currently only the Rails default, ",Object(r.b)("a",Object(a.a)({parentName:"li"},{href:"https://github.com/puma/puma"}),"Puma"),", is supported (including puma in your Gemfile is all you need to do - no other configuration is necessary).")),Object(r.b)("p",null,"Phases are just Ruby classes that respond to the ",Object(r.b)("inlineCode",{parentName:"p"},"apply_to(dockerfile)")," method. It's possible to define your own custom phases and insert them into the build process. To do so, create a Ruby class and define the appropriate method. Then, insert your new phase. For example, let's define a phase that writes a file into the image that contains the current git commit ID (it can be handy to know which version of your code your image contains). We assume the current git commit is passed as a Docker build argument, since it won't be available to Docker otherwise (in other words, the .git folder won't and shouldn't be copied into the image)."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-ruby"}),"class GitCommitPhase\n  def apply_to(dockerfile)\n    dockerfile.run('echo $GIT_COMMIT > GIT_COMMIT')\n  end\nend\n\nKuby.define('my-app') do\n  environment(:production) do\n    docker do\n      insert :git_commit_phase, GitCommitPhase.new, after: :copy_phase\n    end\n  end\nend\n")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"Kuby::Docker::Dockerfile")," objects respond to the following methods, which are mapped 1:1 to ",Object(r.b)("a",Object(a.a)({parentName:"p"},{href:"https://docs.docker.com/engine/reference/builder/#format"}),"Dockerfile instructions"),":"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"from(image_url, as: nil)")),Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"workdir(path)")),Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"env(key, value)")),Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"run(command)")),Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"copy(source, dest, from: nil)")),Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"expose(port)")),Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"cmd(command)"))))}d.isMDXComponent=!0},91:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return m}));var a=t(0),i=t.n(a);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,i=function(e,n){if(null==e)return{};var t,a,i={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var s=i.a.createContext({}),d=function(e){var n=i.a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},p=function(e){var n=d(e.components);return i.a.createElement(s.Provider,{value:n},e.children)},b={inlineCode:"code",wrapper:function(e){var n=e.children;return i.a.createElement(i.a.Fragment,{},n)}},u=i.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,o=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=d(t),u=a,m=p["".concat(o,".").concat(u)]||p[u]||b[u]||r;return t?i.a.createElement(m,c(c({ref:n},s),{},{components:t})):i.a.createElement(m,c({ref:n},s))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,o=new Array(r);o[0]=u;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var s=2;s<r;s++)o[s]=t[s];return i.a.createElement.apply(null,o)}return i.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);