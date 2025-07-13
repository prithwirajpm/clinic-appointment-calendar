import { toast } from "react-toastify";

export const handleDeleteConfirm = (index, handleDelete) => {
  const toastId = toast(
    ({ closeToast }) => (
      <div>
        <p>Are you sure you want to delete this booking Details?</p>
        <div className="flex gap-2 mt-2">
          <button
            className="bg-[var(--primarycolor)] text-[var(--textcolorsecondary)] px-3 py-1 rounded"
            onClick={() => {
              handleDelete(index); // will use selectedDate from closure
              toast.dismiss(toastId);
            }}
          >
            Yes
          </button>
          <button
            className="bg-gray-400 text-white px-3 py-1 rounded"
            onClick={() => toast.dismiss(toastId)}
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
    }
  );
};
