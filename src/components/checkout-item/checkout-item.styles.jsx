import styled from "styled-components";

export const CheckOutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const CheckoutItemImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;
`;

export const CheckOutItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

export const CheckoutItemName = styled.div`
  width: 23%;
`;

export const CheckoutItemQuantity = styled.div`
  width: 23%;
  display: flex;
`;

export const CheckoutItemPrice = styled.div`
  width: 23%;
`;

export const CheckoutItemArrow = styled.span`
  cursor: pointer;
`;

export const CheckoutItemValue = styled.span`
  margin: 0 10px;
`;

export const CheckoutItemRemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;
