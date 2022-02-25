import { useContext } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { GetStaticPaths } from 'next';
import { products, categories } from '../../../products.dummy';
import Navbar from '../../../components/navbar';
import BottomNavbar from '../../../components/bottomNavbar';
import { ActionButton } from '../../../components/actionButton';
import { AuthContext } from '../../../context/AuthContext';
import { CartContext } from '../../../context/CartContext';

type CategoryProps = {
    catName: string;
};

const Category: NextPage<CategoryProps> = (props: CategoryProps) => {
    const { catName } = props;
    const { isAuth, authLoading } = useContext(AuthContext);
    const { cart, addItem, removeItem, cartLoading } = useContext(CartContext);
    let productsToDisplay = products.filter((item: Product) => item.category === catName);

    return (
        <div>
            <Head>
                <title>{catName}</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="relative flex flex-col mt-20 mb-20">
                <Navbar />
                {cartLoading || authLoading ? (
                    <div className="flex justify-center items-center mt-20 pt-20">
                        <div className="h-2.5 w-2.5 bg-yellow-600 rounded-full mr-1 animate-bounce"></div>
                        <div className="h-2.5 w-2.5 bg-yellow-600 rounded-full mr-1 animate-bounce200"></div>
                        <div className="h-2.5 w-2.5 bg-yellow-600 rounded-full animate-bounce400"></div>
                    </div>
                ) : (
                    <main className="max-w-full">
                        <div className="px-6">
                            <div className="pt-6">
                                <div className="text-sm flex text-yellow-600">
                                    <Link href="/">Home</Link>
                                    <div className="pl-2">{`>`}</div>
                                    <div className="pl-2 text-gray-600">{catName}</div>
                                </div>
                                <div className="text-lg sm:text-2xl pt-6 font-semibold">
                                    {catName}
                                </div>
                            </div>
                        </div>
                        <div className="pt-10 px-6 pb-10">
                            <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-4 md:gap-x-6 md:gap-y-8">
                                {productsToDisplay.map((item: Product, index: number) => {
                                    return (
                                        <div
                                            key={index}
                                            className="p-4 bg-white border border-gray-300 rounded-md w-72"
                                        >
                                            <div className="flex flex-col max-w-full">
                                                <div className="p-1 my-2 w-16 flex items-center justify-center bg-green-600 text-white text-xs uppercase rounded-md font-bold">
                                                    {item.discount}% Off
                                                </div>
                                                <div className="mb-3 flex justify-center">
                                                    <Link
                                                        href={`/category/${catName}/${item.id}`}
                                                        passHref
                                                    >
                                                        {/* <img
                                                            className="h-32 w-32 object-fit"
                                                            src={item.img_lg}
                                                        /> */}
                                                        <Image
                                                            alt={item.name}
                                                            src={item.img_lg}
                                                            height={200}
                                                            width={200}
                                                            objectFit="contain"
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="flex items-end text-yellow-600 font-bold text-base mb-2">
                                                    ₹{item.price}
                                                    <div className="line-through text-sm text-gray-600 font-medium pl-2">
                                                        ₹{item.price_before_discount}
                                                    </div>
                                                </div>
                                                <div className="text-gray-600 tracking-wide text-sm overflow-hidden overflow-ellipsis whitespace-nowrap mb-1">
                                                    {item.name}
                                                </div>
                                                <div className="text-xs text-gray-600">
                                                    {item.quantity}
                                                </div>
                                                <div className="mt-3 flex-1">
                                                    <ActionButton
                                                        isAuth={isAuth}
                                                        cart={cart}
                                                        product={item}
                                                        addItem={addItem!}
                                                        removeItem={removeItem!}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </main>
                )}
                <BottomNavbar />
            </div>
        </div>
    );
};

export const getStaticPaths: GetStaticPaths = async (ctx: any) => {
    const paths = categories.map((cat: Category) => ({
        params: { catName: cat.name },
    }));
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx: any) => {
    const { catName } = ctx.params;
    return {
        props: { catName },
    };
};

export default Category;
