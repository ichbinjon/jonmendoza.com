---
title: Fixing a 30-Second Search Query at Apple
date: 2025-12-28
description: Nobody waits 30 seconds to search. We had to fix it.
---

Search took 30 seconds. We weren't going to launch like that.

A wiki you can't search is just a pile of documents. Nobody's going to wait 30 seconds to find something. They'll just ping a coworker instead.

This was 2020. I was a new grad at Apple, fresh off a rotational program, and I'd landed on a team building an internal wiki. Think Notion, but with deep integrations into Apple's infrastructure. Org charts, access control, automations, all of it.

This thing was supposed to be Apple-wide. Other teams had their own Confluence instances or whatever, but those were siloed. If someone on the iPhone team needed to share docs with someone in a totally different org, this was going to be the way. It eventually hit 150k daily active users.

But first, we had to fix search.

## Why it was slow

Apple cares a lot about information security. Every document had access control rules. Who could see it based on their team, what NDAs they'd signed, what org they were in. You could set permissions at the space level, folder level, or individual page. Rules inherited or overrode each other. Powerful, but complicated.

We used <a href="https://solr.apache.org/" target="_blank">Solr</a> for search. To enforce access control, we had a PostFilter that ran after every query. The way PostFilters work: after the main query runs, Solr calls your filter's collect() method for every matching document. Our filter would call out to a graph database to check if the user had access to that document. If they did, pass it through. If not, skip it.

So if your query matched 10,000 documents, we made 10,000 calls to the graph database. Even if you only wanted 25 results. Pagination didn't help either: to render page 2, you still had to filter everything before it just to know what belonged on each page.

![PostFilter flow - query matches thousands of docs, each checked against graph DB](/blog/images/postfilter-flow.png)

How did we end up here? This was pre-launch, still in alpha. The team cut every corner to get something working quickly. We'd fix it later if we had to. We had to.

This was blocking launch. I got assigned to fix it.

## The fix

I didn't have some genius insight. I just looked at it long enough that the obvious answer became obvious: stop checking permissions after you find documents. Make permissions part of how you find documents.

So I indexed every document with its access control rules baked in. User IDs, group IDs, NDA IDs. All flattened into fields in Solr. When someone searches, their permissions are just another filter in the query. One call, no external lookups.

![New search flow - permissions indexed with docs, single query](/blog/images/new-search-flow.png)

The idea was simple. Actually doing it was harder.

I was a new grad proposing a complete rearchitecture of how we indexed pages into search. This wasn't a tweak. It was rethinking the whole approach, and I was going to do it mostly on my own. The stakes were high. At Apple, an access control incident isn't just a bug, it's a serious issue. Like, really bad.

So I had to get it right.

The tricky part is keeping the index up to date. ACLs change all the time. Someone gets added to a folder, someone leaves a team, an NDA expires. You can't just index once and forget about it.

So I set up an event-driven system. Whenever a page's ACL changed, it published an event to a queue. A worker would pick up that event, look up the current state of the document's permissions, flatten them into the list of user IDs, group IDs, and NDA IDs that should have access, and push an update to Solr.

![Event-driven indexing pipeline](/blog/images/event-pipeline.png)

Took about two weeks to build. This was pre-LLMs, so it was just me reading Solr documentation and thinking hard.

## The tradeoff

The whole thing was async. That means there's a window where the index is stale.

If someone loses access to a doc, they might still see it in search results for a few seconds until the job runs. We decided that was fine. If you could see something a moment ago, seeing it for two more seconds isn't a disaster.

I added telemetry to track the indexing lag. It stayed in the low seconds.

![Indexing lag chart - stays well under alert threshold](/blog/images/indexing-lag.png)

## The result

First time I ran a query after flipping this on: under a second.

I didn't trust it. Ran it again. Pulled up a few documents from the results to verify access controls were working correctly. Everything checked out. It was actually working.

30 seconds down to under one.

## What happened after

The wiki launched. Did exactly what it was supposed to do. Became the connective tissue for documentation across Apple.

After that, things moved on the way they do. My mentor left the company. Engineers rotated to other projects. I eventually did too. The wiki kept running. It just wasn't the main thing anymore.

But I'm still proud of those two weeks in 2020. Staring at a 30-second query and making it fast.
