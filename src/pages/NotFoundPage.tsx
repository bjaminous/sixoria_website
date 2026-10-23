import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <main id="main-content" className="min-h-screen bg-cream-50 flex items-center justify-center">
            <div className="text-center px-4">
                <div className="font-display text-9xl font-bold text-forest-200 mb-4">404</div>
                <h1 className="font-display text-3xl font-bold text-forest-800 mb-4">
                    {t('common.page_not_found')}
                </h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    {t('common.page_not_found_text')}
                </p>
                <Link to="/" className="btn-primary">
                    ← {t('common.back_home')}
                </Link>
            </div>
        </main>
    );
};

export default NotFoundPage;
