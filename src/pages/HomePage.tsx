import { useRef, useState } from "react";

interface ProductType {
  // 상품데이터의 타입 별칭을 명시함
  id: number;
  name: string;
  explanation: string;
  price: number;
}

interface ProductItemProps {
  product: ProductType;
  handleDelete: (id: number) => void;
  handelUpdate: (product: ProductType) => void;
}

const ProductItem = ({ product, handleDelete, handelUpdate }: ProductItemProps) => {
  const { id, name, explanation, price } = product;
  const [isEditMode, setIsEditMode] = useState(false);
  const [editName, setEditName] = useState(product.name);
  const [editExplanation, setEditExplanation] = useState(product.explanation);
  const [editPrice, setEditPrice] = useState(product.price);

  return (
    <div key={id}>
      <div>{id}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{explanation}</div>
      <button onClick={() => handleDelete(id)}>삭제하기</button>
      <button onClick={() => { setIsEditMode(prev => !prev) }}>수정하기</button>

      {
        isEditMode ? (
          <form onSubmit={(e) => {
            e.preventDefault();
            handelUpdate({ id, name: editName, price: editPrice, explanation: editExplanation });
          }}>
            <input type="text" placeholder="상품 이름" value={editName} onChange={e => setEditName(e.target.value)} />
            <input type="text" placeholder="상품 설명" value={editExplanation} onChange={e => setEditExplanation(e.target.value)} />
            <input type="text" placeholder="상품 가격" value={editPrice} onChange={e => setEditPrice(parseInt(e.target.value, 10))} />
            <button type="submit">수정완료</button>
          </form>
        ) : (<div> </div>)
      }
    </div>
  );
};



function HomePage() {
  const [products, setProducts] = useState<ProductType[]>([
    {
      id: 0,
      name: "스타벅스 기프티콘",
      explanation: "교환유효기간은 93일 입니다. (시즌성 상품, 기업경품(B2B), 할인상품의 경우 유효기간이 상이 할 수 있습니다.)",
      price: 10000,
    },
  ])

  const [name, setName] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  let fakeId = useRef(0);

  const handleCreate = (newProduct: Omit<ProductType, 'id'>) => {
    fakeId.current += 1;
    setProducts([
      ...products,
      {
        id: fakeId.current,
        name,
        explanation,
        price
      }
    ])
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  }

  const handleUpdate = (updateProduct: {id: number,name:string, explanation:string, price:number }) => {
   setProducts(products.map((product) => product.id === updateProduct.id ? updateProduct : product));
  }

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleCreate({ name, explanation, price });
      } }>
        <input value={name} onChange={e => setName(e.target.value)}
          type="text" placeholder="상품 이름" />
        <input value={explanation} onChange={e => setExplanation(e.target.value)}
          type="text" placeholder="상품 설명" />
        <input value={price} onChange={e => setPrice(parseInt(e.target.value, 10))}
          type="number" placeholder="상품 가격" />
        <input type="submit" value="상품만들기"  />
      </form>

      {products.map((product) => (
        <ProductItem key={product.id} product={product} handelUpdate={handleUpdate} handleDelete={handleDelete} />
      ))}
    </>
  );
}

export default HomePage;
