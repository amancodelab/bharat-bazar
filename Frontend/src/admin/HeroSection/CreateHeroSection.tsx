import { useState } from "react";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import { useAppDispatch } from "../../ReduxToolkit/store";
import { createBanner } from "../../ReduxToolkit/Features/Admin/bannerSlice";
import UserRole from "../../Common/Data/UserRole";

const CreateHeroSection = () => {
  const dispatch = useAppDispatch();

  const [loadingImage, setLoadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    role: UserRole.CUSTOMER,
    image: "",
    active: true,
  });

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
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return alert("Title is required.");
    }

    if (!formData.image) {
      return alert("Please upload a banner image.");
    }

    dispatch(createBanner(formData));

    setFormData({
      title: "",
      subtitle: "",
      buttonText: "",
      role: UserRole.CUSTOMER,
      image: "",
      active: true,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-8 max-w-2xl"
    >
      <h1 className="text-2xl font-bold mb-6">Create Hero Section</h1>

      {/* Title */}
      <div className="mb-5">
        <label className="block font-semibold mb-2">Title</label>

        <input
          type="text"
          className="border rounded-lg p-3 w-full"
          placeholder="Enter banner title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
      </div>

      {/* Subtitle */}
      <div className="mb-5">
        <label className="block font-semibold mb-2">Subtitle</label>

        <textarea
          rows={4}
          className="border rounded-lg p-3 w-full"
          placeholder="Enter banner subtitle"
          value={formData.subtitle}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              subtitle: e.target.value,
            }))
          }
        />
      </div>

      {/* Button Text */}
      <div className="mb-5">
        <label className="block font-semibold mb-2">Button Text</label>

        <input
          type="text"
          className="border rounded-lg p-3 w-full"
          placeholder="Shop Now"
          value={formData.buttonText}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              buttonText: e.target.value,
            }))
          }
        />
      </div>

      {/* Role */}
      <div className="mb-5">
        <label className="block font-semibold mb-2">User Role</label>

        <select
          className="border rounded-lg p-3 w-full"
          value={formData.role}
          onChange={(e: any) =>
            setFormData((prev) => ({
              ...prev,
              role: e.target.value,
            }))
          }
        >
          {Object.values(UserRole).map((role) => (
            <option key={role} value={role}>
              {role
                .replace("_", " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      {/* Active */}
      <div className="mb-6 flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.active}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              active: e.target.checked,
            }))
          }
        />

        <label className="font-semibold">Active Banner</label>
      </div>

      {/* Upload Image */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Upload Banner Image</label>

        <input type="file" accept="image/*" onChange={handleImage} />

        {loadingImage && (
          <p className="text-blue-600 mt-2">Uploading image...</p>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt="Banner Preview"
            className="w-full max-w-md h-56 mt-4 rounded-lg object-cover border"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loadingImage}
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
      >
        {loadingImage ? "Uploading..." : "Create Hero Section"}
      </button>
    </form>
  );
};

export default CreateHeroSection;
