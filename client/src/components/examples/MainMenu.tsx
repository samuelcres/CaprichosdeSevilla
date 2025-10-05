import MainMenu, { getMenuIcons } from '../MainMenu';

export default function MainMenuExample() {
  const icons = getMenuIcons();

  const options = [
    { id: 'transport', icon: icons.transport, title: 'Transporte' },
    { id: 'checkin', icon: icons.checkin, title: 'Check-in' },
    { id: 'wifi', icon: icons.wifi, title: 'Wi-Fi' },
    { id: 'tourism', icon: icons.tourism, title: 'Turismo y Recomendaciones' },
    { id: 'contact', icon: icons.contact, title: 'Contacto y Ayuda' },
  ];

  return (
    <MainMenu
      options={options}
      apartmentName="Capricho de Ibarra"
      onSelect={(id) => console.log('Menu option selected:', id)}
      onBack={() => console.log('Back clicked')}
    />
  );
}
