import React from "react";
import { ProfileForm } from "@/components/ProfileForm";

const Profile: React.FC = () => {
	return (
		<div style={{ maxWidth: 400, margin: "2rem auto" }}>
			<h2>Profile</h2>
			<ProfileForm onSave={console.log} />
		</div>
	);
};

export default Profile;
