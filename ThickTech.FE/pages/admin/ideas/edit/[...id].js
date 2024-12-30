import Layout from "@/components/admin/AdminLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BlogForm from "@/components/admin/blog/BlogForm";
import apiService from "@/services/api";
export default function EditBlogPage() {
  const [blogInfo, setBlogInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    apiService.get(`/api/blogs/${id}`).then((response) => {
      setBlogInfo(response);
    });
  }, [id]);
  return (
    <Layout>
      {blogInfo && <BlogForm {...blogInfo} headerTitle="Edit Blog" />}
    </Layout>
  );
}
