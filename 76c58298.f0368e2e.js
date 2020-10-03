(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{68:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return s})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return d}));var r=t(2),a=t(6),o=(t(0),t(90)),i={id:"managing-secrets",title:"Managing Secrets",sidebar_label:"Managing Secrets",slug:"/managing-secrets"},s={unversionedId:"managing-secrets",id:"managing-secrets",isDocsHomePage:!1,title:"Managing Secrets",description:"Secrets are defined as any sensitive configuration data your app needs to run. Secrets include things like 3rd-party API keys, usernames, and passwords. Kubernetes provides a special kind of object, appropriately called a Secret, to store secrets.",source:"@site/docs/manging_secrets.md",slug:"/managing-secrets",permalink:"/docs/docs/managing-secrets",editUrl:"https://github.com/getkuby/kuby-docs/edit/master/docs/manging_secrets.md",version:"current",sidebar_label:"Managing Secrets",sidebar:"sidebar",previous:{title:"Customizing Kubernetes Resources",permalink:"/docs/docs/customizing-kubernetes-resources"},next:{title:"Managing Data Stores",permalink:"/docs/docs/data-stores"}},c=[{value:"Rails&#39; Encrypted Credentials",id:"rails-encrypted-credentials",children:[]},{value:"Custom Secrets",id:"custom-secrets",children:[]}],l={rightToc:c};function d(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Secrets are defined as any sensitive configuration data your app needs to run. Secrets include things like 3rd-party API keys, usernames, and passwords. Kubernetes provides a special kind of object, appropriately called a ",Object(o.b)("inlineCode",{parentName:"p"},"Secret"),", to store secrets."),Object(o.b)("h2",{id:"rails-encrypted-credentials"},"Rails' Encrypted Credentials"),Object(o.b)("p",null,"Rails natively provides a way to manage secrets known as the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://edgeguides.rubyonrails.org/security.html#custom-credentials"}),"encrypted credentials")," store. Credentials are encrypted with a master key and stored in config/credentials.yml.enc. Rather than convert this file into a Kubernetes secret, Kuby instead creates a secret that contains only the master key. When your app boots, Kubernetes makes the ",Object(o.b)("inlineCode",{parentName:"p"},"RAILS_MASTER_KEY")," environment variable available inside the container. Your app can use ",Object(o.b)("inlineCode",{parentName:"p"},"Rails.application.credentials")," as it normally would without any additional configuration."),Object(o.b)("p",null,"During the deploy, Kuby will first attempt to read your master key from the ",Object(o.b)("inlineCode",{parentName:"p"},"RAILS_MASTER_KEY")," environment variable and fall back to reading the contents of config/master.key. If neither exists, your secrets won't be accessible inside the container. As you'd expect, config/master.key is ignored by git, meaning config/master.key won't exist inside a fresh clone of your codebase. For that reason, make sure you store the master key in a secure location immediately after creating your app with ",Object(o.b)("inlineCode",{parentName:"p"},"rails new"),". To pass it in during the deploy, try something like this:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"RAILS_MASTER_KEY='abc123' bundle exec kuby -e production deploy\n")),Object(o.b)("h2",{id:"custom-secrets"},"Custom Secrets"),Object(o.b)("p",null,"For those who would rather not use Rails' encrypted credentials store, Kuby allows adding custom secrets in the form of key/value pairs. These key/value pairs will appear as environment variables inside your running containers."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ruby"}),"Kuby.define('my-app') do\n  environment(:production) do\n    plugin(:rails_app) do\n      app_secrets do\n        add 'GMAIL_USERNAME', 'foo@bar.com'\n        add 'GMAIL_PASSWORD', '123abc'\n      end\n    end\n  end\nend\n")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"NOTE"),": Please don't hard-code secrets into your Kuby config as I have done in the example above. Read them from a file, pass them in as environment variables, or... do something else. The whole point of secrets is to keep them out of your code and therefore out of git. For example, try this instead:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-ruby"}),"Kuby.define('my-app') do\n  environment(:production) do\n    plugin(:rails_app) do\n      app_secrets do\n        add 'GMAIL_USERNAME', ENV['GMAIL_USERNAME']\n        add 'GMAIL_PASSWORD', ENV['GMAIL_PASSWORD']\n      end\n    end\n  end\nend\n")),Object(o.b)("p",null,"Then deploy like so:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"GMAIL_USERNAME='foo@bar.com' GMAIL_PASSWORD='abc123' \\\n  bundle exec kuby -e production deploy\n")))}d.isMDXComponent=!0},90:function(e,n,t){"use strict";t.d(n,"a",(function(){return p})),t.d(n,"b",(function(){return m}));var r=t(0),a=t.n(r);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=a.a.createContext({}),d=function(e){var n=a.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},p=function(e){var n=d(e.components);return a.a.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.a.createElement(a.a.Fragment,{},n)}},b=a.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=d(t),b=r,m=p["".concat(i,".").concat(b)]||p[b]||u[b]||o;return t?a.a.createElement(m,s(s({ref:n},l),{},{components:t})):a.a.createElement(m,s({ref:n},l))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var o=t.length,i=new Array(o);i[0]=b;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<o;l++)i[l]=t[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,t)}b.displayName="MDXCreateElement"}}]);