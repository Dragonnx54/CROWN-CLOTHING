import { useNavigate } from 'react-router-dom';
import styles from './directory-item.module.scss'

const DirectoryItem = ({category}) => {
    const { title, imageUrl} = category;
    const navigate = useNavigate();
    const navigateToCategory = () => navigate(`shop/${title}`);
    return(
        <div className={`${styles.container}`} onClick={navigateToCategory}>
            <div className={`${styles.backgroundImage}`} style={{
                backgroundImage: `url(${imageUrl})`,
            }}/>

            <div className={`${styles.body}`}>
                <h2>{title}</h2>
                <p>Shop now!</p>
            </div>
        </div>
    );
}

export default DirectoryItem;