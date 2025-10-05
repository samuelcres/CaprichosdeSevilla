import LanguageSelector from '../LanguageSelector';

export default function LanguageSelectorExample() {
  return (
    <LanguageSelector
      title="Bienvenido a Caprichos de Sevilla"
      subtitle="Selecciona tu idioma preferido"
      onSelect={(lang) => console.log('Language selected:', lang)}
    />
  );
}
