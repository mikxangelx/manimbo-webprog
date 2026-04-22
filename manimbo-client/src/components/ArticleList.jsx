import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {articles.slice(0, 4).map((article, index) => (
        <article
          key={article.name}
          className="rounded-[1.75rem] border border-[#efe4d9] bg-white p-4 text-left shadow-[0_12px_30px_rgba(95,74,49,0.05)] transition duration-200 hover:-translate-y-1"
        >
          <div className="flex h-[340px] items-center justify-center overflow-hidden rounded-[1.35rem] bg-[#fbf7f2]">
            <img
              src={article.image}
              alt={article.title}
              className="max-h-full w-full object-contain"
            />
          </div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#a17f64]">
            Article {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-[#2f241f]">
            {article.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-[#6e5b4d]">
            {article.description}
          </p>
          <Button to={`/articles/${article.name}`} className="mt-5">
            Read More
          </Button>
        </article>
      ))}
    </div>
  );
};

export default ArticleList;
