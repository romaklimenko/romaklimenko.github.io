---
title: "Sitecore Connect™ for Sitecore CMP 2.0.0"
date: "2020-01-21"
tags: ["sitecore", "content-hub"]
---

[Sitecore Connect™ for Sitecore CMP version 2.0.0](https://dev.sitecore.net/Downloads/Sitecore_Connect_for_Sitecore_CMP/20/Sitecore_Connect_for_Sitecore_CMP_200.aspx) was released this week. It is a module that syncs content created in the Sitecore Content Hub to Sitecore XP.

The module has excellent documentation. However, in this post, I'd like to shed some light on the technical aspects of the module.

In Sitecore XP, the building blocks are called items. In Content Hub, there are entities. The entities have fields and relations.

Say, we have created a blog post in English (`en-US`) in Content Hub. In this case, Content Hub, we have an entity with properties like `Title`, `Body`, etc. A relation named `ContentTypeToContent` from a `Blog` entity to our entity makes our entity a blog post.

And a relation named `LocalizationToContent` from `en-US` entity to our entity tells us that our blog post is in American English.

Now, if we localize our blog post, say, to `nl-BE`, Content Hub creates another blog post entity and links it via the `LocalizationToContent` relation to `nl-BE` language entity. There's also a `ContentToContentLocalization` relation from our English blog post to a localized Belgian one.

<img src="entity.png" class="img-fluid" />

Now, let's see how Sitecore Connect™ for Sitecore CMP 2.0.0 pulls the entities to Sitecore XP items:

When an entity is published, a Content Hub trigger executes an action that pushes a message to a topic (`hub_out`) in Azure Service bus. The message contains the `entity_id`, and other systems can subscribe to the topic to know about the new changes.

On the Sitecore XP side (CM), a subscription client listens to the new messages in the `hub_out`.

Then a new message appears, the `cmp.importEntity` pipeline starts.

The `cmp.importEntity` pipeline runs three following processors:

`FetchEntity` processor:

1.  Gets the `entity_id` from the Service Bus message.
2.  Gets the entity from Content Hub.
3.  Resolves the content language by getting the `LocalizationToContent` relation.
4.  Resolves the localization parent (if it exists) by getting the `ContentToContentLocalization`.

`EnsureItem` processor:

1.  Tries to get an item that corresponds to the entity.
2.  It searches for an item in a configured Items Bucket where the `Entity Identifier` field is equal to the identifier of the entity (if there is no `ContentToContentLocalization` parent entity) or equal to the `ContentToContentLocalization` parent entity.
3.  Sets the `Entity Identifier` field of the new item.
4.  If there's no such an item, the processor creates a new item in the language from the `LocalizationToContent` relation. Otherwise, it uses the default language setting.

`SaveFieldValues` processor:

1.  Saves the item fields that configured for synchronization.
2.  After the `cmp.importEntity` finishes, the module pushes a message to another topic - `hub_in`. This message contains things like incoming message id, item id, entity id, exception, if any.

Content Hub consumes the message and knows the status of the entity synchronization.

<img src="topology.png" class="img-fluid" />
