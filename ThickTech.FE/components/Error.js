export default function Error({ isError = false, message = "" }) {
  if (isError) {
    return (
      <div className="flex justify-center items-center flex-col gap-8">
        <img src="../../assets/error-404.png" alt="Error" className="w-3/12" />
        <span className="text-md text-slate-600">{message}</span>
      </div>
    );
  }
}
