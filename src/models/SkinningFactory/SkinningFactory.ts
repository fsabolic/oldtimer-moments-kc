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

    const unsortedImages: { id: string; name: string | null }[] = [];

    for (const file of files) {
      if (file.mime_type === "application/json") {
        const response = await pinata.gateways.public.get(file.cid);
        skinning.textJson = this.sanitizeTextJson(
          this.mapJsonResponseToTextJson(response.data as Q),
        );
      } else {
        unsortedImages.push({ id: file.cid, name: file.name });
      }
    }

    skinning.imageIds = unsortedImages
      .sort((a, b) => {
        if (a.name === null || b.name === null) return 0;
        return a.name.localeCompare(b.name);
      })
      .map((image) => image.id);

    return skinning;
  }

  private sanitizeTextJson(obj: T): T {
    return this.sanitize(obj);
  }

  private sanitize<U>(val: U): U {
    if (typeof val === "string") {
      return val
        .replaceAll("<q>", '"')
        .replaceAll("</q>", '"')
        .replace(/<br\s*\/?>/gi, "\n\n") as unknown as U;
    }

    if (Array.isArray(val)) {
      return val.map((item: unknown) => this.sanitize(item)) as unknown as U;
    }

    if (val !== null && typeof val === "object") {
      const result = {} as Record<string, unknown>;
      for (const [key, value] of Object.entries(val)) {
        result[key] = this.sanitize(value);
      }
      return result as unknown as U;
    }

    return val;
  }
}
