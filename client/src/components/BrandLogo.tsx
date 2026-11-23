import fullDay from '@assets/logo-caprichos-2026-transparente.webp';
import fullNight from '@assets/logo-caprichos-2026-noche.webp';
import wideDay from '@assets/logo-caprichos-2026-horizontal-transparente.webp';
import wideNight from '@assets/logo-caprichos-2026-horizontal-noche.webp';

// Logotipo sin fondo: versión de día y versión clara para el modo noche.
export default function BrandLogo({ variant = 'horizontal', className = '' }: { variant?: 'horizontal' | 'full'; className?: string }) {
  const day = variant === 'full' ? fullDay : wideDay;
  const night = variant === 'full' ? fullNight : wideNight;
  return (
    <>
      <img src={day} alt="Caprichos de Sevilla" className={`${className} dark:hidden`} />
      <img src={night} alt="Caprichos de Sevilla" className={`${className} hidden dark:block`} />
    </>
  );
}
