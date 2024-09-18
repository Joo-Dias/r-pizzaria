import styles from "./page.module.scss";
import logoImg from "/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo da pizzaria" />

        <section className={styles.login}>
          <form action="">
            <input
              type="email"
              required
              name="email"
              placeholder="Digite seu e-mail..."
              className={styles.input}
            />

            <input
              type="password"
              required
              name="password"
              placeholder="*****"
              className={styles.input}
            />

            <button type="submit">Acessar</button>
          </form>

          <Link href="/signUp" className={styles.text}>
            Não Possui uma conta? Cadastre-se
          </Link>
        </section>
      </div>
    </>
  );
}
