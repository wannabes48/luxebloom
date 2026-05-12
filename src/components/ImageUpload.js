"use client";

import { CldUploadWidget } from 'next-cloudinary';

/**
 * Premium Image Upload Component for BloomStacks Gifts Co.
 * Allows admins to upload product images directly to Cloudinary.
 */
export default function ImageUpload({ onUploadSuccess }) {
  return (
    <CldUploadWidget 
      uploadPreset="luxe_bloom_presets"
      onSuccess={(result) => {
        if (result.event === "success") {
          // Pass the secure_url or public_id to the parent callback
          onUploadSuccess(result.info.public_id);
        }
      }}
    >
      {({ open }) => (
        <button 
          type="button"
          onClick={() => open()}
          className="btn btn-gold btn-sm"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "8px" }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Upload Product Image
        </button>
      )}
    </CldUploadWidget>
  );
}
