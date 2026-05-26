import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/Button.jsx';
import seedArticles from '../../data/article-content.js';
import { fetchArticleByName } from '../../services/ArticleService.js';

const PLACEHOLDER =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240"><rect width="320" height="240" fill="%23fbf7f2"/><text x="50%" y="50%" font-family="serif" font-size="18" fill="%23a17f64" text-anchor="middle" dy=".35em">No image</text></svg>';

const normalize = (article) => ({
  title: article.title,
  description: article.description,
  image: article.imageUrl || article.image || '',
  content: Array.isArray(article.content)
    ? article.content
    : article.paragraphs || [],
});

function ArticlePage() {
  const { name } = useParams();
  const seed = seedArticles.find((entry) => entry.name === name);
  const [article, setArticle] = useState(seed ? normalize(seed) : null);
  const [loading, setLoading] = useState(!seed);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchArticleByName(name)
      .then(({ data }) => {
        if (cancelled) return;
        const payload = data?.data ?? data;
        setArticle(normalize(payload));
        setNotFound(false);
      })
      .catch(() => {
        if (cancelled) return;
        if (!seed) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [name, seed]);

  if (notFound && !article) {
    return (
      <div className="flex w-full flex-col gap-6 px-3 pt-3 sm:px-4">
        <section className="rounded-[2rem] border border-[#efe3d7] bg-[#fdfbf8] px-6 py-12 text-center sm:px-8">
          <div className="mx-auto w-full max-w-3xl">
            <h1 className="text-4xl font-semibold text-[#2f241f]">Article not found</h1>
            <p className="mt-4 text-base leading-7 text-[#6e5b4d]">
              The story you are looking for may have moved or does not exist yet.
            </p>
            <Button to="/articles" className="mt-8" variant="primary">
              Back to Articles
            </Button>
          </div>
        </section>
      </div>
    );
  }

  if (loading && !article) {
    return (
      <div className="flex w-full flex-col gap-6 px-3 pt-3 sm:px-4">
        <section className="rounded-[2rem] border border-[#efe3d7] bg-[#fdfbf8] px-6 py-12 text-center sm:px-8">
          <p className="text-sm text-[#6e5b4d]">Loading article…</p>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6 px-3 pt-3 sm:px-4">
      <section className="rounded-[2rem] border border-[#efe3d7] bg-[linear-gradient(120deg,#ffffff_0%,#fdfaf6_58%,#f7f1ea_100%)] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a17f64]">
              Editorial Story
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[1.04] text-[#2f241f] sm:text-6xl">
              {article.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#6e5b4d] sm:text-lg">
              {article.description}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#efe3d7] bg-[#fdfbf8] px-6 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-10 flex h-[320px] w-full items-center justify-center overflow-hidden rounded-[1.7rem] bg-[#fbf7f2] sm:h-[460px]">
            <img
              src={article.image || PLACEHOLDER}
              alt={article.title}
              className="max-h-full w-full object-contain"
              onError={(event) => {
                event.currentTarget.src = PLACEHOLDER;
              }}
            />
          </div>

          <div className="mx-auto max-w-3xl space-y-6 text-center">
            {article.content.map((paragraph, index) => (
              <p
                key={index}
                className="whitespace-pre-wrap text-base leading-8 text-[#5f4b3d] sm:text-[17px]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-3xl border-t border-[#e8dbce] pt-8 text-center">
            <Button to="/articles" variant="primary">
              Back to Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ArticlePage;
