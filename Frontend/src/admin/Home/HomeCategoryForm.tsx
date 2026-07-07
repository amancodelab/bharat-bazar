import { useEffect, useState } from "react";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import {
  useAppDispatch,
  useAppSelector,
  type RootState,
} from "../../ReduxToolkit/store";
import {
  createHomeCategory,
  fetchCategories,
} from "../../ReduxToolkit/Features/Admin/homeCategorySlice";

const HomeCategoryForm = () => {
  const dispatch = useAppDispatch();

  const { categories, loading } = useAppSelector(
    (state: RootState) => state.adminHomeCategory,
  );

  const [loadingImage, setLoadingImage] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    categoryId: "",
    section: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    if (!formData.categoryId) {
      alert("Please select a category.");
      return;
    }

    if (!formData.section) {
      alert("Please select a section.");
      return;
    }

    dispatch(createHomeCategory(formData));

    setFormData({
      image: "",
      categoryId: "",
      section: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <div>
        <label className="block mb-2 font-semibold">Upload Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="w-full border rounded-lg p-2"
        />

        {loadingImage && <p className="mt-2 text-blue-600">Uploading...</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-40 h-40 mt-4 rounded-lg object-cover border"
          />
        )}
      </div>

      <div>
        <label className="block mb-2 font-semibold">Select Category</label>

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Category</option>

          {categories?.map((category: any) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2 font-semibold">Homepage Section</label>

        <select
          name="section"
          value={formData.section}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">Select Section</option>

          <option value="ELECTRIC_CATEGORIES">Electronic Categories</option>

          <option value="GRID">Grid</option>

          <option value="SHOP_BY_CATEGORIES">Shop By Categories</option>

          <option value="DEALCATEGORIES">Deal Categories</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || loadingImage}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-500"
      >
        {loading ? "Saving..." : "Create Home Category"}
      </button>
    </form>
  );
};

export default HomeCategoryForm;
