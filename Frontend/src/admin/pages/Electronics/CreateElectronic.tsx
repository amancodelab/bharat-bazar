import { useMemo, useState } from "react";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import { createElectronic } from "../../../ReduxToolkit/Features/Admin/electronicSlice";

const CreateElectronic = () => {
  const dispatch = useAppDispatch();

  const { mainCategories } = useAppSelector((state: any) => state.mainCategory);

  const [loadingImage, setLoadingImage] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    categoryId: "",
  });

  // Find Electronics category only
  const electronicsCategory = useMemo(() => {
    return mainCategories.find(
      (category: any) => category.categoryId === "electronics",
    );
  }, [mainCategories]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setLoadingImage(true);

      const imageUrl = await uploadToCloudinary(file);

      setFormData((prev) => ({
        ...prev,
        image: imageUrl,
      }));
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image");
      return;
    }

    if (!formData.categoryId) {
      alert("Please select an electronic category");
      return;
    }

    dispatch(createElectronic(formData));

    setFormData({
      image: "",
      categoryId: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-8 max-w-xl"
    >
      <h1 className="text-2xl font-bold mb-6">Create Electronic Category</h1>

      {/* Upload Image */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Upload Image</label>

        <input type="file" accept="image/*" onChange={handleImage} />

        {loadingImage && <p className="text-blue-600 mt-2">Uploading...</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-40 h-40 mt-4 rounded-lg object-cover border"
          />
        )}
      </div>

      {/* Electronics Sub Categories */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Electronic Category</label>

        <select
          className="border rounded-lg p-3 w-full"
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({
              ...formData,
              categoryId: e.target.value,
            })
          }
        >
          <option value="">Select Electronic Category</option>

          {electronicsCategory?.level2Category.map((category: any) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loadingImage}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800"
      >
        Create Electronic
      </button>
    </form>
  );
};

export default CreateElectronic;
