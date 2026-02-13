import SignupForm from "../components/SignupForm";
import Header from "../layout/Header";
import Footer from "../layout/Footer";

export default function SignupPage() {
  return (
    <section>
      <Header />
      <div className="flex justify-between bg-teal-600">
        <div className="flex flex-col gap-12 justify-center items-center py-24 flex-1">
          <h1 className="font-bold text-2xl border-2 p-4 bg-gray-200 rounded-br-3xl rounded-tl-3xl shadow-2xl ring-4 ring-sky-500">
            REGISTER FORM
          </h1>
          <SignupForm />
        </div>
      </div>
      <Footer />
    </section>
  );
}
