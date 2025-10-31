import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

var dict={
	'anouncement': 'Ανακοινώσεις',
	'parent-profile': 'Προφίλ Κηδεμόνα',
	'nanny-profile': 'Προφίλ Επιμελητή',
	'p_dashboard': 'Προφίλ Κηδεμόνα',
	'search': 'Αναζήτηση Επιμελητών',
	'nanny-profile-overview': 'Προφίλ Επιμελητή',
	'collaboration-request': 'Αίτηση Συνεργασίας',
	'active-collaboration-overview': 'Ενεργή Συνεργασία',
	'guardians': 'Οδηγίες Κηδεμόνων',
	'caretakers': 'Οδηγίες Επιμελητών',
	'Contacts': 'Επικοινωνία'
	'active-collaboration-overview': 'Ενεργή Συνεργασία', 
	'end-collaboration' : 'Λήξη συνεργασίας',
	'anouncement': 'Ανακοινώσεις',
	'payment': 'Πληρωμή Κηδεμόνα',
	'voucher-card' : 'Εξαργύρωση Voucher',
	'collaboration-request-nanny' : 'Αίτημα Συνεργασίας'

}

const Breadcrumbs = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);
	let breadcrumbPath = "";

	return (
		<div className={styles.breadcrumbs}>
			<Link to="/"><i className="fa-solid fa-house"></i>Αρχική</Link>
			{pathnames.map((name, index) => {
				breadcrumbPath += `/${name}`;
				const isLast = index === pathnames.length - 1;
			
				return isLast ? (
					<span key={breadcrumbPath}>
						/ {dict[name]}
					</span>
				) : (
					<span key={breadcrumbPath}>
						{" "} 
						/ <Link to={breadcrumbPath}>  {dict[name]}</Link>
					</span>
				);
			})}
		</div>
	);
};

export default Breadcrumbs;