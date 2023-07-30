import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerRestaurant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Restaurant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly rating: number;
  readonly notes?: string[] | null;
  readonly Categories?: RestaurantCategory[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRestaurant = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Restaurant, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly rating: number;
  readonly notes?: string[] | null;
  readonly Categories: AsyncCollection<RestaurantCategory>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Restaurant = LazyLoading extends LazyLoadingDisabled ? EagerRestaurant : LazyRestaurant

export declare const Restaurant: (new (init: ModelInit<Restaurant>) => Restaurant) & {
  copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant>) => MutableModel<Restaurant> | void): Restaurant;
}

type EagerCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly restaurants?: (RestaurantCategory | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly restaurants: AsyncCollection<RestaurantCategory>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

type EagerRestaurantCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RestaurantCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly restaurantId?: string | null;
  readonly categoryId?: string | null;
  readonly restaurant: Restaurant;
  readonly category: Category;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRestaurantCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<RestaurantCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly restaurantId?: string | null;
  readonly categoryId?: string | null;
  readonly restaurant: AsyncItem<Restaurant>;
  readonly category: AsyncItem<Category>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type RestaurantCategory = LazyLoading extends LazyLoadingDisabled ? EagerRestaurantCategory : LazyRestaurantCategory

export declare const RestaurantCategory: (new (init: ModelInit<RestaurantCategory>) => RestaurantCategory) & {
  copyOf(source: RestaurantCategory, mutator: (draft: MutableModel<RestaurantCategory>) => MutableModel<RestaurantCategory> | void): RestaurantCategory;
}