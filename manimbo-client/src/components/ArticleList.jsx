import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.slice(0, 4).map((article, index) => (
        <article
          key={article.name}
          className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-4"
        >
          <div className="flex h-[400px] items-center justify-center">
            <img
              src={article.image}
              alt={article.title}
              className="max-h-full w-full rounded-[1.25rem] border border-stone-300/80 object-contain"
            />
          </div>
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Article {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {article.description}
          </p>
          <Button to={`/articles/${article.name}`} className="mt-4">
            Read More
          </Button>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
