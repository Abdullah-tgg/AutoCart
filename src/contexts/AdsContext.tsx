import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Ad {
  id: string;
  category: string;
  licenseNumber: string;
  itemName: string;
  status: string;
  images: any[];
  seller: {
    name: string;
    type: string;
    profileImage: string;
  };
  storyImages: any[];
  phoneNumber: string;
  location: string;
  currency: string;
  price: string;
  description: string;
  createdAt: Date;
}

interface AdsContextType {
  ads: Ad[];
  addAd: (ad: Omit<Ad, 'id' | 'createdAt'>) => void;
  updateAd: (id: string, ad: Partial<Ad>) => void;
  deleteAd: (id: string) => void;
  getAdById: (id: string) => Ad | undefined;
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

export const AdsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [ads, setAds] = useState<Ad[]>([]);

  const addAd = (adData: Omit<Ad, 'id' | 'createdAt'>) => {
    const newAd: Ad = {
      ...adData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setAds(prevAds => [newAd, ...prevAds]);
  };

  const updateAd = (id: string, adData: Partial<Ad>) => {
    setAds(prevAds =>
      prevAds.map(ad => (ad.id === id ? { ...ad, ...adData } : ad)),
    );
  };

  const deleteAd = (id: string) => {
    setAds(prevAds => prevAds.filter(ad => ad.id !== id));
  };

  const getAdById = (id: string) => {
    return ads.find(ad => ad.id === id);
  };

  return (
    <AdsContext.Provider value={{ ads, addAd, updateAd, deleteAd, getAdById }}>
      {children}
    </AdsContext.Provider>
  );
};

export const useAds = () => {
  const context = useContext(AdsContext);
  if (context === undefined) {
    throw new Error('useAds must be used within an AdsProvider');
  }
  return context;
};
