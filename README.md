# @frog_ai 
:slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong::slot_machine::congratulations::mahjong:

## 


### Background :cloud:
At frog, we spend a lot of time reading | writing | opining about the future. One area of great interest and debate stands at the intersection of artificial intelligence (AI) and machine learning. 

In addition to thinking, we enjoy making things too; both to satisfy our own curiosities and to understand how new tools work, we sometimes make things to ask better questions.

@frog_ai is but another question and an evolving response to our fascination with the impact AI will / is having on our lives.

### About | Process :arrows_counterclockwise:
We started with a naïve question: _"With so much chatter going on about data, could we train an AI to talk about AI?"_

While Markov chains have been a common model for generating text, the availability of high-performance processing has enabled machine learning models to become usable by a wider audience. Given a large enough training data-set (about 2MB of plain text), [Recurrent neural networks](karpathy.github.io/2015/05/21/rnn-effectiveness/) (RNNs) can be an effective way to generate "meaningful" text.

With our tool selected, the next question was, _"where should the training data come from?"_

Enter frogs and Slack. frogs are smart people who we like to think form their opinions wisely. And slack is a tool we use everyday to share influences, with a programmatic interface for sourcing content (i.e. bots) . Ergo:

##### slack bot + rnn + frog-selected corpus = frog_ai

##

In its current form, frog_ai contains three primary entities:

* A slack bot _(link eventually to repo)_
* A recurrent neural network _(link eventually to repo)_
* A growing, artisanal, frog-selected corpus of writings / canon about design, technology, and the future _(link eventually to dataset)_

The basic workflow for the system is as follows:
1. Find a relevant text (training data)
2. Add training to the corpus via Slack (@frog_ai)
3. Manage and pre-process data
4. Train models
5. Find model with lowest validation loss
6. Seed and generate text using our model

### Results :+1::white_check_mark:

Here are some samples from our model:

    All is different with insight.

######

    Artificial intelligence is used to discuss some long-term memories of introduction-tatal.

######

    In every classification of which learning and controlling principle of other events, and companies, with weaks universe of resulting processing, knowledge-based provided used for design.

######

    We shit special worlds, and thoughts match when we report the system?

######

    With the dispotent and technical emotional knowledge of strategies to use with the technology to simply chaunite any are they quite an exploit the wailer; we formed, the affordance is a skill 

#####

    Data is imagined.

######

    Is understanding the machine proceed of thought[?]

######


### Contribute :bulb:

You can find @frog_ai hanging out in the slack channel [#frog-ai-training](https://frog.slack.com/messages/C6GN4GYGM). Post a link to something you find relevant, and follow the instructions!

Thoughts? Opinions? Hate it? Love it? Let [@karin.giefer](https://frog.slack.com/messages/D6F33Q6P6) or [@jeffrey.ong](https://frog.slack.com/messages/D1KFTNVCY) know if you have feedback or encounter any issues.


### Tools :hammer::wrench:

* [Slack Bots](https://api.slack.com/bot-users) for a conversational interface to submit training data
* [torch-rnn](https://github.com/jcjohnson/torch-rnn) for a blazing RNN implementation
* [Aylien](http://docs.aylien.com/) for concept tagging

### To-Do :memo:
* Document code
* Implement way to visualize / understand the model's results over time
* Transparent & editable corpus
* ???
