import { useMemo, useState } from "react";
import { uploadToCloudinary } from "../../../util/uploadToCloudinary";
import { useAppDispatch, useAppSelector } from "../../../ReduxToolkit/store";
import { createShopCategory } from "../../../ReduxToolkit/Features/Admin/shopCategorySlice";

const CreateShopCategory = () => {
  const dispatch = useAppDispatch();

  const { mainCategories } = useAppSelector((state) => state.mainCategory);

  const [loadingImage, setLoadingImage] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    mainCategory: "",
    categoryId: "",
  });

  // Filter level2 categories based on selected main category
  const filteredCategories = useMemo(() => {
    const selectedMain: any = mainCategories.find(
      (main: any) => main.categoryName === formData.mainCategory,
    );

    return selectedMain ? selectedMain.level2Category : [];
  }, [mainCategories, formData.mainCategory]);

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
      alert("Please upload an image.");
      return;
    }

    if (!formData.mainCategory) {
      alert("Please select a main category.");
      return;
    }

    if (!formData.categoryId) {
      alert("Please select a category.");
      return;
    }

    dispatch(
      createShopCategory({
        image: formData.image,
        categoryId: formData.categoryId,
      }),
    );

    setFormData({
      image: "",
      mainCategory: "",
      categoryId: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-8 max-w-xl"
    >
      <h1 className="text-2xl font-bold mb-6">Create Shop Category</h1>

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

      {/* Main Category */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Main Category</label>

        <select
          className="border rounded-lg p-3 w-full"
          value={formData.mainCategory}
          onChange={(e) =>
            setFormData({
              ...formData,
              mainCategory: e.target.value,
              categoryId: "", // Reset category
            })
          }
        >
          <option value="">Select Main Category</option>

          {mainCategories.map((main: any) => (
            <option key={main.id} value={main.categoryName}>
              {main.categoryName}
            </option>
          ))}
        </select>
      </div>

      {/* Level 2 Category */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Select Category</label>

        <select
          className="border rounded-lg p-3 w-full"
          value={formData.categoryId}
          disabled={!formData.mainCategory}
          onChange={(e) =>
            setFormData({
              ...formData,
              categoryId: e.target.value,
            })
          }
        >
          <option value="">Select Category</option>

          {filteredCategories.map((category: any) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loadingImage}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
      >
        Create Shop Category
      </button>
    </form>
  );
};

export default CreateShopCategory;
