import { PinataSDK } from "pinata";
import { SectionSkinning } from "../Skinning";

export interface SkinningFactory<T> {
  readonly groupName: string;
  apply(skinning: SectionSkinning<T>): void;
}

export abstract class BaseSkinningFactory<T, Q> implements SkinningFactory<T> {
  abstract readonly groupName: string;
  abstract apply(skinning: SectionSkinning<T>): void;
  abstract mapJsonResponseToTextJson(json: Q): T;

  async buildSkinning(
    pinata: PinataSDK,
    groupId: string,
  ): Promise<SectionSkinning<T>> {
    const files = await pinata.files.public.list().group(groupId).all();

    const skinning: SectionSkinning<T> = {
      imageIds: [],
      textJson: {} as T,
    };

    for (const file of files) {
      if (file.mime_type === "application/json") {
        const response = await pinata.gateways.public.get(file.cid);
        skinning.textJson = this.mapJsonResponseToTextJson(response.data as Q);
      } else {
        skinning.imageIds.push(file.cid);
      }
    }

    return skinning;
  }
}
