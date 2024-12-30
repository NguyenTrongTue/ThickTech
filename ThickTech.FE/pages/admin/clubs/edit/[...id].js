import Layout from "@/components/admin/AdminLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiService from "@/services/api";
import ClubForm from "@/components/admin/club/ClubForm";
export default function EditClubPage() {
  const [clubInfor, setClubInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    apiService.get(`/api/clubs/${id}`).then((response) => {
      setClubInfo(response);
    });
  }, [id]);
  return (
    <Layout>
      {clubInfor && <ClubForm clubData={clubInfor} headerTitle="Edit Blog" />}
    </Layout>
  );
}
