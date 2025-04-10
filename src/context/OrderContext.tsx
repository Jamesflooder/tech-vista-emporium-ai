
import React, { createContext, useContext, useState, useEffect } from "react";
import { Order, CartItem } from "@/types";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], total: number, address: string, paymentMethod: string) => Order;
  getOrdersByUser: (userId: string) => Order[];
  getAllOrders: () => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  // Update localStorage when orders change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const createOrder = (
    items: CartItem[],
    total: number,
    address: string,
    paymentMethod: string
  ): Order => {
    if (!user) {
      throw new Error("Vous devez être connecté pour passer une commande");
    }

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      userId: user.id,
      items,
      total,
      status: "pending",
      address,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    setOrders([...orders, newOrder]);
    toast.success("Commande créée avec succès");
    return newOrder;
  };

  const getOrdersByUser = (userId: string): Order[] => {
    return orders.filter((order) => order.userId === userId);
  };

  const getAllOrders = (): Order[] => {
    return orders;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
    toast.success(`Statut de la commande mis à jour: ${status}`);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrdersByUser,
        getAllOrders,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
