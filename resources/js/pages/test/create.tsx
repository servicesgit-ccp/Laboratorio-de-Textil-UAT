import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import PageTitle from '@/components/PageTitle';
import TestForm from '@/components/_test/TestForm';

const TestRequestCreate = () => {
    return (
        <MainLayout>
            <Head title="Nueva Solicitud de Análisis" />
            <PageTitle
                title="Nueva Solicitud de Análisis"
                subTitle="Registrar solicitud de prueba textil"
            />
            <TestForm />
        </MainLayout>
    );
};

export default TestRequestCreate;
