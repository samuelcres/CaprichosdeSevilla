import ApartmentSelector from '../ApartmentSelector';

export default function ApartmentSelectorExample() {
  return (
    <ApartmentSelector
      title="Selecciona tu apartamento"
      ibarraName="Capricho de Ibarra"
      quevedoName="Capricho de Quevedo"
      onSelect={(apt) => console.log('Apartment selected:', apt)}
      onBack={() => console.log('Back clicked')}
    />
  );
}
