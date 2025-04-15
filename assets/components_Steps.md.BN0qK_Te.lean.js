import{_ as h,C as a,c as k,o as E,P as t,G as i,w as e}from"./chunks/framework.CdsvqyZN.js";const F=JSON.parse('{"title":"Steps","description":"","frontmatter":{},"headers":[],"relativePath":"components/Steps.md","filePath":"components/Steps.md"}'),o={name:"components/Steps.md"};function r(d,s,g,c,y,u){const l=a("NSteps"),n=a("Wrap"),p=a("MileStone");return E(),k("div",null,[s[0]||(s[0]=t('<h1 id="steps" tabindex="-1">Steps <a class="header-anchor" href="#steps" aria-label="Permalink to &quot;Steps&quot;">​</a></h1><h2 id="步骤条组件" tabindex="-1">步骤条组件 <a class="header-anchor" href="#步骤条组件" aria-label="Permalink to &quot;步骤条组件&quot;">​</a></h2><p>封装一个步骤条组件（vue3）</p><h3 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h3>',4)),i(n,null,{default:e(()=>[i(l)]),_:1}),s[1]||(s[1]=t(`<h3 id="code" tabindex="-1">Code <a class="header-anchor" href="#code" aria-label="Permalink to &quot;Code&quot;">​</a></h3><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">n-step</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  header-dot</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;右边&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;默认content在右边&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">n-step</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">n-step</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  contentPosition</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;left&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;左边&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;contentPosition=left  属性将内容展示在左边&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">n-step</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">n-step</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;template #title&gt; 传递插槽 &lt;/template&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;template #description&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    业务场景中有时需要对第三方组件进行二次封装, 比如弹窗,表格等组件,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    有时项目内会根据业务进行二次封装成业务组件,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    新的业务组件会需要把自己的slots透传给原本的组件, 也可以叫传递插槽</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;/template&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">n-step</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="other-example" tabindex="-1">Other Example <a class="header-anchor" href="#other-example" aria-label="Permalink to &quot;Other Example&quot;">​</a></h2><p>基于Step组件定制化开发一些业务组件</p>`,4)),i(n,null,{default:e(()=>[i(p)]),_:1}),s[2]||(s[2]=t(`<h2 id="传递插槽" tabindex="-1">传递插槽 <a class="header-anchor" href="#传递插槽" aria-label="Permalink to &quot;传递插槽&quot;">​</a></h2><p>业务场景中有时需要对第三方组件进行二次封装, 比如弹窗,表格等组件,有时项目内会根据业务进行二次封装成业务组件, 新的业务组件会需要把自己的slots透传给原本的组件, 也可以叫传递插槽</p><p>// NStep.vue 组件中</p><div class="language-vue vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">NStepLeft</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-bind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$attrs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;!-- 将slot透传给NStepLeft --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;template</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        v-for=&quot;(item, key, index) in $slots&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        :key=&quot;index&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        v-slot:[key]=&quot;slotScope&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        &lt;slot :name=&quot;key&quot; v-bind=&quot;slotScope&quot;&gt;&lt;/slot&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      &lt;/template&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">NStepLeft</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>NStepLeft 是需要被二次封装的组件</p>`,5))])}const q=h(o,[["render",r]]);export{F as __pageData,q as default};
