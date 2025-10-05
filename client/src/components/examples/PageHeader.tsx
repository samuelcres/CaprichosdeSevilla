import PageHeader from '../PageHeader';

export default function PageHeaderExample() {
  return (
    <div>
      <PageHeader
        onBack={() => console.log('Back clicked')}
        onHome={() => console.log('Home clicked')}
        title="Transporte"
      />
      <div className="p-8 text-center text-muted-foreground">
        Page content goes here
      </div>
    </div>
  );
}
