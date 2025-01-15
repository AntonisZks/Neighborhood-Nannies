
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

var dict={
    'anouncement': 'Ανακοινώσεις',
	'parent-profile' : 'Προφίλ Κηδεμόνα'
}

const Breadcrumbs = () => {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);
	let breadcrumbPath = "";

	return (
		<div className={styles.breadcrumbs}>
			<Link to="/"><i class="fa-solid fa-house"></i>Αρχική</Link>
			{pathnames.map((name, index) => {
				breadcrumbPath += `/${name}`;
				const isLast = index === pathnames.length - 1;
				console.log(pathnames, breadcrumbPath);	
				return isLast ? (
					
					<span key={breadcrumbPath}> / {dict[name]}</span>
				) : (
					<span key={breadcrumbPath}>
						{" "}
						/ <Link to={breadcrumbPath}>{dict[name]}</Link>
					</span>
				);
			})}
		</div>
	);
};

export default Breadcrumbs;