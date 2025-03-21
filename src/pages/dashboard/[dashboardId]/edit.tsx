import Header from "@/components/common/Header";
import EditMember from "@/components/EditMember";
import InvitationHistory from "@/components/InvitationHistory";
import NewDashboard from "@/components/ModalContents/NewDashboard";
import { getMember } from "@/api/member";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { getInvitations } from "@/api/invitations.api";
import { useState } from "react";
import { DashButton } from "@/components/common/Button";
import { deleteDashboard } from "@/api/dashboard";
import arrow from "@/assets/icons/LeftArrow.icon.svg";
import { useRouter } from "next/router";
import Image from "next/image";
//

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { dashboardId: "13624" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  let cursorId;
  let initialMembers;
  let initialInvitations;
  let result;
  const { dashboardId } = context.params!;
  try {
    const res = await getMember(Number(dashboardId));
    const invitationData = await getInvitations((cursorId = 0));
    initialMembers = res.data.results ?? [];

    initialMembers = res?.data?.results ?? []; // undefined 방지
    initialInvitations = invitationData?.invitations ?? []; // undefined 방지

    cursorId = invitationData?.cursorId ?? 0; // null 방지
  } catch {
    result = { initialInvitations: [], initialMembers: [] };
  }
  console.log(initialInvitations);
  console.log(initialMembers);
  console.log(dashboardId);

  return {
    props: {
      initialMembers: initialMembers ?? [],
      initialInvitations: initialInvitations ?? [],
      dashboardId,
    },
  };
};

interface Props {
  initialMembers: Member[];
  initialInvitations: Invitation[];
  dashboardId: string;
}
export default function EditPage({
  initialMembers,
  initialInvitations,
  dashboardId,
}: Props) {
  const router = useRouter();
  const [members, setMembers] = useState(initialMembers);
  const [invitations, setInvitations] = useState(initialInvitations);

  const DashBoardDelete = async () => {
    await deleteDashboard(Number(dashboardId));
    router.push("/mypage");
  };

  return (
    <>
      <Header />
      <div className="px-3 py-4 tablet:px-5 tablet:py-5 ml-[300px]">
        <div className="flex flex-col gap-[10px] tablet:gap-[19px] laptop:gap-[34px]">
          <button className="flex items-start">
            <Image src={arrow} width={20} height={20} alt="<" />
            돌아가기
          </button>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <NewDashboard />
              <EditMember members={members} />
              <InvitationHistory invitations={invitations} />
            </div>
            <div className=" tablet:w-[320px] h-[52px] tablet:h-[62px] ">
              <DashButton onClick={DashBoardDelete} size="medium">
                대시보드 삭제하기
              </DashButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
