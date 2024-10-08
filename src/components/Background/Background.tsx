import styles from './Background.module.css';

export default function Background({ url }: { url: string }) {
  return <div style={{ background: `url(${url}) center/cover no-repeat` }} className={styles.background}></div>;
}
