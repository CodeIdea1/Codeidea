import styles from '../styles/falling-leaves.module.css'

const FallingLeaves = () => {
    return (
        <div className={styles.fallingLeaves}>
            <div className={`${styles.leaf} ${styles.leaf1}`}></div>
            <div className={`${styles.leaf} ${styles.leaf2}`}></div>
            <div className={`${styles.leaf} ${styles.leaf3}`}></div>
            <div className={`${styles.leaf} ${styles.leaf4}`}></div>
        </div>
    )
}

export default FallingLeaves