import Button from '../components/Button';
import ArticleList from '../components/ArticleList';
import articles from '../assets/article-content.js';

import img10 from '../assets/img10.jpg';

const ArticlesListPage = () => {
  return (
     <div className="flex w-full flex-col gap-6">

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
  <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

    
    <div className="flex flex-col justify-center items-center text-center max-w-xl mx-auto">

  <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
    Articles
  </p>

  <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
    Stories Worth Sharing
  </h1>

  <p className="mt-4 text-sm leading-7 text-zinc-600 sm:text-base">
    This is where simple moments turn into meaningful stories—
    a space for reflections, creativity, and pieces of everyday life.
  </p>

  <div className="mt-6 flex justify-center">
    <Button to="/">Back Home</Button>
  </div>

</div>
    <div>
      <img
        src={img10}
        alt="Feature"
        className="w-full h-[650px] object-cover rounded-[1.25rem]"
      />
    </div>

  </div>
</section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Article card grid</h2>
        </div>

        

        <ArticleList articles={articles} />
      </section>
    </div>
  );
};

export default ArticlesListPage;

