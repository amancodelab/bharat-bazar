import { useState } from "react";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import { useAppDispatch } from "../../ReduxToolkit/store";
import { createHomeCategory } from "../../ReduxToolkit/Features/Admin/homeCategorySlice";

const CreateHomeCategory = () => {
  const dispatch = useAppDispatch();

  const [loadingImage, setLoadingImage] = useState(false);

  const [formData, setFormData] = useState({
    image: "",
    categoryId: "",
    section: "",
  });

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoadingImage(true);

    const url = await uploadToCloudinary(file);

    setFormData({
      ...formData,
      image: url,
    });

    setLoadingImage(false);
  };

  const handleSubmit = () => {
    dispatch(createHomeCategory(formData));
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">Create Home Category</h1>

      <input type="file" onChange={handleImage} />

      {loadingImage && <p>Uploading...</p>}

      {formData.image && (
        <img src={formData.image} className="w-40 rounded mt-4" />
      )}

      <select
        className="border p-2 w-full mt-5"
        onChange={(e) =>
          setFormData({
            ...formData,
            categoryId: e.target.value,
          })
        }
      >
        <option>Select Category</option>

        <option value="CATEGORY_ID">Laptop</option>

        <option value="CATEGORY_ID">Phone</option>
      </select>

      <select
        className="border p-2 w-full mt-5"
        onChange={(e) =>
          setFormData({
            ...formData,
            section: e.target.value,
          })
        }
      >
        <option>Select Section</option>

        <option value="ELECTRIC_CATEGORIES">Electronic</option>

        <option value="GRID">Grid</option>

        <option value="SHOP_BY_CATEGORIES">Shop By Category</option>

        <option value="DEALCATEGORIES">Deal Category</option>
      </select>

      <button
        onClick={handleSubmit}
        className="bg-black text-white w-full py-2 rounded mt-6"
      >
        Save
      </button>
    </div>
  );
};

export default CreateHomeCategory;
