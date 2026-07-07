import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import { useAppDispatch, useAppSelector } from "..//../ReduxToolkit/store";
import {
  fetchBannerById,
  updateBannerById,
} from "../../ReduxToolkit/Features/Admin/bannerSlice";
import UserRole from "../../Common/Data/UserRole";

const EditHeroSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state: any) => state.banner);
  const banner = useAppSelector((state) => state.banner.currentBanner);

  const [loadingImage, setLoadingImage] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    role: UserRole.CUSTOMER,
    image: "",
    active: true,
  });

  const bannerId = id;

  // Fetch banner
  useEffect(() => {
    if (bannerId) {
      dispatch(fetchBannerById(bannerId));
    }
  }, [dispatch, bannerId]);

  // Fill form after banner is fetched
  useEffect(() => {
    if (!banner) return;

    setFormData({
      title: banner.title ?? "",
      subtitle: banner.subtitle ?? "",
      buttonText: banner.buttonText ?? "",
      role: banner.role ?? UserRole.CUSTOMER,
      image: banner.image ?? "",
      active: banner.active ?? true,
    });
  }, [banner]);

  // Upload Image
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
      alert("Failed to upload image");
    } finally {
      setLoadingImage(false);
    }
  };

  // Update Banner
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bannerId) return;

    if (!formData.title.trim()) {
      alert("Title is required.");
      return;
    }

    if (!formData.image) {
      alert("Please upload an image.");
      return;
    }

    try {
      await dispatch(
        updateBannerById({
          bannerId,
          bannerData: formData,
        }),
      ).unwrap();

      navigate("/admin/hero-section");
    } catch (error) {
      console.error(error);
      alert("Failed to update banner");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">Loading...</div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-xl p-8 max-w-2xl"
    >
      <h1 className="text-2xl font-bold mb-6">Update Hero Section</h1>

      {/* Title */}
      <div className="mb-5">
        <label className="block font-semibold mb-2">Title</label>

        <input
          type="text"
          className="border rounded-lg p-3 w-full"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
      </div>

      {/* Subtitle */}
      <div className="mb-5">
        <label className="block font-semibold mb-2">Subtitle</label>

        <textarea
          rows={4}
          className="border rounded-lg p-3 w-full"
          value={formData.subtitle}
          onChange={(e) =>
            setFormData({
              ...formData,
              subtitle: e.target.value,
            })
          }
        />
      </div>

      {/* Button Text */}
      <div className="mb-5">
        <label className="block font-semibold mb-2">Button Text</label>

        <input
          type="text"
          className="border rounded-lg p-3 w-full"
          value={formData.buttonText}
          onChange={(e) =>
            setFormData({
              ...formData,
              buttonText: e.target.value,
            })
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
            setFormData({
              ...formData,
              role: e.target.value,
            })
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
            setFormData({
              ...formData,
              active: e.target.checked,
            })
          }
        />

        <label className="font-semibold">Active Banner</label>
      </div>

      {/* Upload Image */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Upload Image</label>

        <input type="file" accept="image/*" onChange={handleImage} />

        {loadingImage && <p className="text-blue-600 mt-2">Uploading...</p>}

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-full max-w-md h-56 mt-4 rounded-lg object-cover border"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={loadingImage}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
      >
        Update Hero Section
      </button>
    </form>
  );
};

export default EditHeroSection;
