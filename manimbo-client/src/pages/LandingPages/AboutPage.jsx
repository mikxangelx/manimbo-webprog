import Button from '../../components/Button';
import img5 from "../../assets/img5.jpg";
import img6 from "../../assets/img6.jpg";
import img7 from "../../assets/img7.jpg";
import img8 from '../../assets/img8.jpg';
import img9 from '../../assets/img9.jpg';

const values = [
  'Honest writing that feels personal and approachable.',
  'Visual storytelling inspired by soft light, home, and memory.',
  'A creative practice rooted in everyday life rather than perfection.',
];

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6 px-3 pt-3 sm:px-4">
      <section className="rounded-[2rem] border border-[#efe3d7] bg-[linear-gradient(120deg,#ffffff_0%,#fdfaf6_58%,#f7f1ea_100%)] px-6 py-10 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-[1.8rem] border border-[#f0e4d8] bg-white/80 p-3 shadow-[0_24px_60px_rgba(104,79,58,0.1)]">
            <img
              src={img5}
              alt="About Club Creative"
              className="h-[360px] w-full rounded-[1.5rem] object-cover sm:h-[500px]"
            />
          </div>

          <div className="text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#a17f64]">
              About Club Creative
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.04] text-[#2f241f] sm:text-6xl">
              A personal space for keeping stories close.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#6e5b4d] sm:text-lg">
              Club Creative was built as a quiet home for thoughts, memories,
              and everyday inspiration. It is part journal, part moodboard, and
              part reminder that simple experiences can still feel meaningful.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/articles" variant="primary">
                Explore Articles
              </Button>
              <Button to="/">Back Home</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-[2rem] border border-[#efe3d7] bg-[#fdfbf8] p-7 text-left shadow-[0_10px_28px_rgba(95,74,49,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a17f64]">
            Creative Values
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[#2f241f]">
            What shapes this little corner
          </h2>
          <div className="mt-6 space-y-4">
            {values.map((value) => (
              <div
                key={value}
                className="rounded-[1.35rem] border border-[#efe4d9] bg-white px-5 py-4"
              >
                <p className="text-sm leading-7 text-[#6e5b4d]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#efe3d7] bg-[#fdfaf6] p-7 shadow-[0_10px_28px_rgba(95,74,49,0.05)]">
          <div className="grid gap-4 sm:grid-cols-2">
            <img
              src={img6}
              alt="Creative detail 1"
              className="h-[220px] w-full rounded-[1.4rem] object-cover"
            />
            <img
              src={img7}
              alt="Creative detail 2"
              className="h-[220px] w-full rounded-[1.4rem] object-cover"
            />
            <img
              src={img8}
              alt="Creative detail 3"
              className="h-[220px] w-full rounded-[1.4rem] object-cover"
            />
            <img
              src={img9}
              alt="Creative detail 4"
              className="h-[220px] w-full rounded-[1.4rem] object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
