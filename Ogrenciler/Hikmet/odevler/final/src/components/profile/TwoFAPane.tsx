import { Card, Tab } from "react-bootstrap";

export default function TwoFAPane({
	activeProfileTab,
	profileTabs,
}: {
	activeProfileTab: string;
	profileTabs: { title: string; icon: string }[];
}) {
	return (
		<Tab.Pane active={activeProfileTab === profileTabs[4].title.toLowerCase()}>
			<Card className="shadow-sm border-0">
				<Card.Header className="bg-white py-3">
					<h4 className="mb-0">{profileTabs[4].title}</h4>
				</Card.Header>
				<Card.Body>
					<p>Configure your two-factor authentication settings here.</p>
				</Card.Body>
			</Card>
		</Tab.Pane>
	);
}
