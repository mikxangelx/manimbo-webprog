import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import articles from '../assets/article-content.js';

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find((entry) => entry.name === name);

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-zinc-900">Article not found</h1>
            <Button to="/articles" className="mt-6">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <Button to="/articles">Back to Articles</Button>
          <div className="mt-6">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Article
            </p>
            <h1 className="text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600 sm:text-base">
              {article.description}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-10 flex h-[320px] w-full items-center justify-center sm:h-[420px]">
            <img
              src={article.image}
              alt={article.title}
              className="max-h-full w-full rounded-[1.5rem] border border-stone-300/80 object-contain"
            />
          </div>

          <div className="mx-auto max-w-3xl space-y-5 text-center">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-wrap text-base leading-8 text-zinc-700"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl border-t-2 border-zinc-900 pt-6 text-center">
            <Button to="/articles">Back to Articles</Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
