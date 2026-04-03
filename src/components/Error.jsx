const Error = ({ message }) => {
  return (
    <div className="text-center mt-6">
      <p className="text-red-400 text-lg font-semibold">
        ⚠️ {message}
      </p>
    </div>
  );
};

export default Error;