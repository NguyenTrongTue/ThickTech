import BlogForm from "@/components/admin/blog/BlogForm";
import Layout from "@/components/admin/AdminLayout";

export default function NewIdea() {
  return (
    <Layout>
      <BlogForm headerTitle="New Idea" />
    </Layout>
  );
}
